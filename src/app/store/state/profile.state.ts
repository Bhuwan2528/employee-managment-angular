import { ProfileServerResponse } from "../../core/models/profile.model";
import { createEntityAdapter, EntityState } from "@ngrx/entity"

export interface ProfileState extends EntityState<ProfileServerResponse>{
    loading: boolean;
    error: string | null;
}

export const profileAdapter = createEntityAdapter<ProfileServerResponse>()

export const initialProfileState: ProfileState = profileAdapter.getInitialState({
    loading: false,
    error: null
  });