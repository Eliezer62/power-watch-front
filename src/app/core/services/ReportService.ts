import { Report } from "../domain/Report"

export interface ReportService {
    create(report:Report):Promise<Report>

    findById(id:string):Promise<Report>

    update(report:Report):Promise<Report>

    delete(id:string):Promise<void>
}