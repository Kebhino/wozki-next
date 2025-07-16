export type Status = "Głosiciel" | "Pionier St." | "Pionier Pom.";

export interface Participant {
  id: string;
  name: string;
  status: Status;
  active: boolean;
}

export type AddParticipantProps = Omit<Participant, "id"> & { id: string };

export type SortConfig = {
  type: "surname" | "status";
  direction: "asc" | "desc";
};
