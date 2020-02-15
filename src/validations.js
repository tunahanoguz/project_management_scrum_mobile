export const projectValidations = {
    projectNameValidation: {
        projectName: {
            presence: {
                message: '^Lütfen proje adı giriniz.'
            },
        }
    },
    projectDescriptionValidation: {
        projectDescription: {
            presence: false,
        }
    },
    projectNoteValidation: {
        projectNote: {
            presence: {
                message: '^Lütfen bir proje notu giriniz.'
            },
        }
    },
};

export const fileValidations = {
    fileNameValidation: {
        projectNote: {
            presence: {
                message: '^Lütfen bir dosya adı giriniz.'
            },
        },
    },
};