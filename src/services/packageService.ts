import axios, { type AxiosInstance } from 'axios';
import { API_BASE_URL } from '../core/constants';
import type { GetPackage, GetPackages, Package, PackageStatus } from '../store/usePackageStore';

if (!API_BASE_URL) {
  console.warn('VITE_REST_API_URL is not defined, REST API calls may fail');
}

const restClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export interface PackageStatusUpdate {
  packageId: number;
  status: PackageStatus;
}
/**
 * Met à jour le statut d'un colis dans la base PostgreSQL via une API REST.
 * L'API REST doit exposer un endpoint PUT /packages/:id/status
 */
export async function listOnePackage(trackingNumber: string): Promise<GetPackage> {
  const response = await restClient.get(`/package/${encodeURIComponent(trackingNumber)}`);
return response.data
}
export async function listPackage(): Promise<GetPackages> {
  const response = await restClient.get(`/package`);
return response.data
}
export async function updatePackage(update: Package): Promise<GetPackage> {
  const response = await restClient.post(`/package`, { update });
return response.data
}
export async function deletePackage(packageId: number): Promise<void> {
  const response = await restClient.delete(`/package/${ packageId }`, );
return response.data
}
export async function updatePackageStatus(update: PackageStatusUpdate): Promise<GetPackage> {
  const { packageId, status } = update;
  const response = await restClient.put(`/package/${encodeURIComponent(packageId)}/status`, { status });
return response.data
}

export default {
  listOnePackage,
  listPackage,
  deletePackage,
  updatePackage,
  updatePackageStatus,
};
