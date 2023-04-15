import { Router } from "express";
import { Company } from "../model/company.model";
import { ObjectId } from "mongodb";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { query } = req;
    let request = Company.find();

    // page and limit filter
    if (query["page"] || query["limit"]) {
      const page = (query["page"] || 0) as number;
      const limit = (query["limit"] || 50) as number;
      request = request.skip(page * limit).limit(limit);
    }
    const companies = await request;
    return res.status(200).json(companies);
  } catch (e) {
    console.error(e);
  }
});
// get company by id
router.get("/:companyId", async (req, res) => {
  const { params } = req;
  try {
    const result = await Company.findById(params["companyId"]);
    if (!result || !result.toObject())
      return res
        .status(404)
        .json({ message: "company not found", status: 404 });
    return res.status(201).json(result?.toObject());
  } catch (e) {
    console.error(e);
    return res.status(404).json({ message: "not found", status: 404 });
  }
});
// delete company
router.delete("/:companyId", async (req, res) => {
  const { params } = req;
  try {
    const result = await Company.findOneAndRemove({_id: new ObjectId(params["companyId"])});
    if (!result || !result.toObject())
      return res
        .status(404)
        .json({ message: "company not found", status: 404 });
    return res.status(201).json({'message': "company removed succuessfully"});
  } catch (e) {
    console.error(e);
    return res.status(404).json({ message: "not found", status: 404 });
  }
});
//

router.patch("/:companyId", async (req, res) => {
  const { query, body, params } = req;
  const { companyId } = params;
console.log(params)
console.log(body)
  if (!companyId)
    return res.status(400).json({ message: "companyId required for update" });
  if (!body || !Object.keys(body).length)
    return res
      .status(400)
      .json({ message: "body is messing, you need to insert data to update" });
  try {
    const request = await Company.findOneAndUpdate(
      { _id: new ObjectId(companyId as string) },
      body
    );
    return res.status(201).json({ ...request?.toObject(), ...body });
  } catch (e) {
    console.error(e);
    return res.status(404).json({ message: "somthing wrong", status: 404 });
  }
});


router.post('/', async (req, res) => {
  const {body} = req
  if (!body || !Object.keys(body).length)
  return res
    .status(400)
    .json({ message: "there no data to insert", status: 400 });
  try{
    const result = (await Company.create(body)).save()
    return res.status(200).json((await result).toObject())

  } catch(e) {
  
    console.error(e);
    return res.status(404).json(e)
  }
})
export default router;
