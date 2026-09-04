function Signup() {
  return (
    <div>
      <h1>Signup</h1>
      <form action="http://localhost:8000/user/signup" method="post">
        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" name="fullName" />
        <br />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">SignUP!</button>
      </form>
    </div>
  );
}

export default Signup;
