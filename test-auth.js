async function test() {
  try {
    const loginRes = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'intellectualronna@web-library.net',
        password: '12345678'
      })
    });
    const loginData = await loginRes.json();
    const token = loginData.result.data.token.accessToken;
    console.log("Logged in!");

    const profileRes = await fetch('http://localhost:5000/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const profileData = await profileRes.json();
    console.log("Profile:", profileData.success);

    const formData = new FormData();
    formData.append('prompt', 'test');
    
    const aiRes = await fetch('http://localhost:5000/ai/generate-video', {
      method: 'POST',
      headers: { 
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    const aiData = await aiRes.json();
    console.log("AI result:", aiData);
    
  } catch(e) {
    console.log("Error:", e);
  }
}
test();
