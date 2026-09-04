function Signin() {
  return (
    <div>
      <h1>Sign IN</h1>
      <form action="http://localhost:8000/user/signin" method="post">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Sign IN!</button>
      </form>
    </div>
  );
}

export default Signin;
