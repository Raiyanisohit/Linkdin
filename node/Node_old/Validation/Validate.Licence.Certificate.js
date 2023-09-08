import joi from 'joi'

export const validateLicenceAndCertificate = ({ data }) => {
    const LicenceAndCertificate = joi.object({
        certificateName: joi.string().required(),
        organizationName: joi.string().required()
    })

    return LicenceAndCertificate.validate(data)
}