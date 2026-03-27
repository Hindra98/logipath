import {
  deletePackage,
  listOnePackage,
  listPackage,
  updatePackage,
  updatePackageStatus,
} from "../services/packageService";
import { create } from "zustand";

export type PackageStatus =
  | "En transit"
  | "Livré"
  | "Reçu"
  | "Retard"
  | "En entrepôt";

export interface PackageState {
  loading: boolean;
  success: boolean;
  error: string | null;

  package: Package | null;
  packages: Package[];
  listPackage: () => void;
  listOnePackage: (trackingNumber: string) => void;
  deletePackage: (id: number) => void;
  updatePackage: (pkg: Package) => void;
  updateStatus: (id: number, status: PackageStatus) => void;
  // filterByOwner: (owner: string) => Package[];
}

export interface GetPackage {
  success: boolean;
  message: string;
  data: Package;
}
export interface GetPackages {
  success: boolean;
  message: string;
  data: DataGetPackages;
}

export interface DataGetPackages {
  packages: Package[];
}

export interface Package {
  id?: number;
  trackingNumber: string;
  status: string;
  customerName: string;
  destination: string;
  estimatedDelivery: string;
  updatedAt: string;
}

export const usePackageStore = create<PackageState>((set, get) => ({
  loading: false,
  success: false,
  error: null,

  package: null,
  packages: [],

  listPackage: async () => {
    set({ loading: true, error: null });
    try {
      const response = await listPackage();
      if (response.success) {
        set({ packages: response.data.packages, success: true });
      }
    } catch (error: any) {
      console.log("Error listing packagess:", error.message);
      set({
        error:
          error?.response?.data?.message ??
          error?.response?.data?.error ??
          `Erreur lors du chargement des colis.`,
        success: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  listOnePackage: async (trackingNumber) => {
    set({ loading: true, error: null });
    try {
      const response = await listOnePackage(trackingNumber);
      if (response.success) {
        set({ package: response.data, success: true });
      }
    } catch (error: any) {
      console.log("Error listing package:", error.message);
      set({
        error:
          error?.response?.data?.message ??
          error?.response?.data?.error ??
          `Erreur lors du chargement du colis.`,
        success: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  updatePackage: async (pkg) => {
    set({ loading: true, error: null });
    try {
      // Appel à l'API pour ajouter le colis
      const response = await updatePackage(pkg);
      if (response.success) {
        const currentPackages = get().packages;
        const updatedPackages = pkg.id
          ? currentPackages.map((p) =>
              p.id === response.data.id ? response.data : p,
            )
          : [...currentPackages, response.data];
        set({ packages: updatedPackages, success: true });
      }
    } catch (error: any) {
      console.log("Error updating package:", error.message);
      set({
        error:
          error?.response?.data?.message ??
          error?.response?.data?.error ??
          `Erreur lors de l'enregistrement du colis.`,
        success: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  deletePackage: async (id) => {
    set({ loading: true, error: null });
    try {
      // Appel à l'API pour ajouter le colis
      await deletePackage(id);
      const currentPackages = get().packages;
      const updatedPackages = currentPackages.filter((p) => p.id !== id);
      set({ packages: updatedPackages, success: true });
    } catch (error: any) {
      console.log("Error delete package:", error.message);
      set({
        error:
          error?.response?.data?.message ??
          error?.response?.data?.error ??
          `Erreur lors de la suppression du colis.`,
        success: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  updateStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      // Appel à l'API pour ajouter le colis
      const response = await updatePackageStatus({ packageId: id, status });
        console.log("Package updated:", response);
      if (response.success) {
        const currentPackages = get().packages;
        console.log("Package updated:", response);
        const updatedPackages = currentPackages.map((p) =>
          p.id === response.data.id ? response.data : p,
        );
        set({ packages: updatedPackages, success: true });
      }
    } catch (error: any) {
      console.log("Error updating status package:", error.message);
      set({
        error:
          error?.response?.data?.message ??
          error?.response?.data?.error ??
          `Erreur lors de la mise a jour du statut du colis.`,
        success: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  // filterByOwner: (owner) => get().packages.filter((p) => p.owner === owner),
}));
