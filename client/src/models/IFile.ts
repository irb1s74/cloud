export interface IFile {
  id: number;
  userId: number;
  parentId: number;
  name: string;
  type: string;
  path: string;
  size: number;
  accessLink: string | null;
  createdAt: string;
  updatedAt: string;
}
