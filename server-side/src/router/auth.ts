import { Router } from "express";
import { User, IUser, userSchema } from "../model/auth.model";
import bcript from "bcrypt";
const router = Router();

router.get("/", (req, res) => {
  res.send("work fine");
});

router.post("/sign-up", async (req, res) => {
  const { body } = req;
  // check if body exist or not
  if (!body || !Object.keys(body).length)
    return res
      .status(400)
      .json({ message: "there no data to insert", status: 400 });
  try {
    const check = await User.find();
    const result = await User.create(
      (check.length != 0 ? body : { ...body, role: "ADMIN" }) as IUser
    );
    return res.status(200).json(result);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/login", async (req, res) => {
  const { body } = req;
  // check if body exist or not
  if (!body || !Object.keys(body).length)
    return res
      .status(400)
      .json({ message: "there no data to insert", status: 400 });
  try {
    const validateInput = await  User.validate()

    const user = await User.findOne({ email: body.email }).lean({});
    // check if password match or not
    const isMatch = await bcript.compare(body.password, user!.password);
    if (!isMatch)
      return res
        .status(400)
        .json({
          message: "invalid Inputs",
          status: 400,
          values: { password: "password not match" },
        });

    return res.status(201).json(user);
  } catch (e) {

    console.error(e);

    return res
      .status(404)
      .json({ message: "somthing wrong happend", status: 404 });
  }
});

export default router;
