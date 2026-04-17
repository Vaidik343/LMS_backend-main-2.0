




// NO NEEDED , ITS WORK INSIDE THE SESSION CONTROLLER
const {ClinicalDetail, Session} = require("../models")

// allowed enum values
const ALLOWED_CLINICAL_TYPES = [
    "ward_round",
    "opd",
    "case_study",
];

    
const createClinicalDetail = async (req, res) => {
    try {
        const {session_id, clinical_type, case_description, patient_category, ward_name} = req.body;

        if(!session_id || !clinical_type)
        {
                  return res.status(400).json({
                message: "chapter_id and content_type are required!"
            });
        }

        // enum validation
        if (!ALLOWED_CLINICAL_TYPES.includes(content_type)) {
            return res.status(400).json({
                message: "Invalid content_type"
            });
        }
        const sessionId = await Session.findByPk(session_id)
        if(sessionId)
        {
            return res.status(400).json({
                message: "not found"
            });
        }

        const existing = await ClinicalDetail.findOne({
            where: {
                session_id, clinical_type
            }
        })

        if (existing) {
            return res.status(409).json({
                message: "already exists for this session and  type"
            });
        }

        const clinicalDetails = await ClinicalDetail.create({
            session_id, clinical_type, case_description, patient_category, ward_name
        })

        res.status(201).json(clinicalDetails);
    } catch (error) {
        console.log(" ~ error:", error)
        res.status(500).json({message:'Server Error'})
    }

}

// const 