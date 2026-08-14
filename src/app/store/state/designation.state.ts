import { DesignationServerResponseDTO } from "../../core/models/designation.model";

export interface DesignationState{
    designations: DesignationServerResponseDTO[];
    loading: boolean;
    error: string | null
}

export const initialDesignationState: DesignationState = {
    designations:[],
    loading: false,
    error: null
}