import { successResponse } from '@/common/utils/response.util';
import { AuthUtilsService } from '@/lib/utils/services/auth-utils.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GoogleAuthDto } from '../dto/google-auth.dto';
import { PrismaService } from '../../../lib/prisma/prisma.service';
import { getFirebaseAdmin } from '../../../lib/firebase/firebase.config';

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly authUtils: AuthUtilsService,
    private readonly prisma: PrismaService,
  ) {}

  async googleLogin(dto: GoogleAuthDto) {
    // 1. Verify Firebase ID token
    let decoded: any;
    try {
      decoded = await getFirebaseAdmin().auth().verifyIdToken(dto.idToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid Firebase ID token');
    }

    // 2. Extract user data from Firebase token
    const googleId = decoded.uid;
    const email = decoded.email || '';
    const name = decoded.name || email.split('@')[0];
    const picture = decoded.picture || null;

    // 3. Upsert user in database
    const user = await this.upsertFromFirebase({
      googleId,
      email,
      name,
      picture,
    });

    // 4. Issue JWT token pair
    const token = await this.authUtils.generateTokenPairAndSave({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    // 5. Return success response
    return successResponse(
      {
        user: await this.authUtils.sanitizeUser(user as any),
        token,
      },
      'Google login successful',
    );
  }

  private async upsertFromFirebase(data: {
    googleId: string;
    email: string;
    name: string;
    picture: string | null;
  }): Promise<any> {
    return this.prisma.client.user.upsert({
      where: { email: data.email },
      update: {
        googleId: data.googleId,
      },
      create: {
        email: data.email,
        googleId: data.googleId,
        name: data.name,
        password: '', // Social login users don't have a password initially
        authProvider: 'GOOGLE',
        profilePicture: data.picture,
        isVerified: true,
      },
    });
  }

  async findByGoogleId(googleId: string): Promise<any | null> {
    return this.prisma.client.user.findUnique({ where: { googleId } });
  }
}
