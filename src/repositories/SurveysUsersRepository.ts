import { EntityRepository, Repository } from "typeorm";

import { SurveyUser } from "../models/SurveyUser";

@EntityRepository(SurveyUser)

class SurveysUsersRepository extends Repository<SurveyUser> {
    static save(surveyUser: SurveyUser) {
        throw new Error("Method not implemented.");
    }
}

export { SurveysUsersRepository };