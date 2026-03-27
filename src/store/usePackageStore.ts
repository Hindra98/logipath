
import {
  deletePackage,
  listOnePackage,
  listPackage,
  updatePackage,
  updatePackageStatus,
} from "../services/packageService";
import {create} from "zustand";

export type PackageStatus = "En transit" | "Livré" | "Reçu" | "Retard";

export interface PackageState {
  loading: boolean;
  success: boolean;
  error: string | null;

  package: Package|null;
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
  data:    Package;
}
export interface GetPackages {
  success: boolean;
  message: string;
  data:    DataGetPackages;
}

export interface DataGetPackages {
  packages: Package[];
}

export interface Package {
  id?:                number;
  trackingNumber:    string;
  status:            string;
  customerName:      string;
  destination:       string;
  estimatedDelivery: Date;
  updatedAt:         Date;
}






export const usePackageStore = create<PackageState>((set, get) => ({
  loading: false,
  success: false,
  error: null,

  package: null,
  packages: [],

  listPackage: async() =>{
    set({ loading: true, error: null });
    try {
      const response = await listPackage();
      if (response.success) {
        set({ packages: response.data.packages, success: true });
      }
      console.log("listPackage response :: ", response);
    } catch (error) {
      set({
        error: `Erreur lors du chargement des colis. ${error.message}`,
        success: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  listOnePackage: async(trackingNumber) =>{
    set({ loading: true, error: null });
    try {
      const response = await listOnePackage(trackingNumber);
      if (response.success) {
        set({ package: response.data, success: true });
      }
    } catch (error) {
      set({
        error: `Erreur lors du chargement des colis. ${error.message}`,
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
    } catch (error) {
      set({
        error: `Erreur lors de l'enregistrement du colis. ${error.message}`,
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
    } catch (error) {
      set({
        error: `Erreur lors de la suppression du colis. ${error.message}`,
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
      if (response.success) {
        const currentPackages = get().packages;
        const updatedPackages = currentPackages.map((p) =>
          p.id === id ? { ...p, status } : p,
        );
        set({ packages: updatedPackages, success: true });
      }
    } catch (error) {
      set({
        error: `Erreur lors de la mise a jour du statut du colis. ${error.message}`,
        success: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  // filterByOwner: (owner) => get().packages.filter((p) => p.owner === owner),
}));

