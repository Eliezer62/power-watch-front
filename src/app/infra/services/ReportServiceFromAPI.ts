import { Report } from "@/app/core/domain/Report";
import { ReportService } from "@/app/core/services/ReportService";
import axios from "axios";
import { injectable } from "inversify";

@injectable()
export class ReportServiceFromAPI implements ReportService {
    async create(report: Report): Promise<Report> {
        return await axios.post(process.env.API_URL+'/report', report)
                        .then((response) => response.data)
                        .catch((error) => {
                            throw new Error(error);
                        });
    }

    async findById(id: string): Promise<Report> {
        return await axios.get(process.env.API_URL+'/report/'+id)
                        .then((response) => response.data)
                        .catch((error) => {
                            throw new Error(error);
                        });
    }

    async update(report: Report): Promise<Report> {
        return await axios.put(process.env.API_URL+'/report/'+report.id, report)
                        .then((response) => response.data)
                        .catch((error) => {
                            throw new Error(error);
                        });
    }

    async delete(id: string): Promise<void> {
        await axios.delete(process.env.API_URL+'/report/'+id);
    }
    
}