## Understanding the data and data.email/password and req.body match
✅ data arg is the placeholder for what user types: It has user inputs
defaultValues in useForm
<!--
defaultValues: {
  email: "",
  password: "",
  confirmPassword: "",
  isSignUp: false
}
-->

👉 So before user types, data.email(("")) is empty and data.password is empty("") as well etc.
`...register("email") and ...register("password")`
These bind the input fields to those keys.

✅When the user types, the values update data.email, data.password.

onSubmit gets data
Example if user typed:
<!--
data = {
  email: "test@mail.com",
  password: "12345",
  confirmPassword: "12345",
  isSignUp: false
}
-->
*axios.post* maps them as
axios.post(url, {
  email: data.email,       // "test@mail.com"
  password: data.password  // "12345"
})
👉 The LHS of above (email, password) here must match what your backend expects in req.body.

So if your backend has:
const { email, password } = req.body;
