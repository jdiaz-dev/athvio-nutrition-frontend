export type ProfessionalBody = {
  _id: string;
  user: {
    firstname: string;
    lastname: string;
    email?: string;
    photo?: string;
  };
};

export type ProfessionalInitialState = ProfessionalBody;
