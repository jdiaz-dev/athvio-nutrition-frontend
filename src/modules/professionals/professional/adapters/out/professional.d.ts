export type ProfessionalBody = {
  uuid: string;
  user: {
    firstname: string;
    lastname: string;
    email?: string;
    photo?: string;
  };
};

export type ProfessionalInitialState = ProfessionalBody;
