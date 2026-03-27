import { useEffect, useState } from "react";
import {
  usePackageStore,
  type Package,
  type PackageStatus,
} from "../../store/usePackageStore";
import { StatusEnum } from "../../core/enum";
import Button from "../ui/Button";
import { formatDate, serializeDate } from "../../utils/date-format";
import Modal from "../ui/Modal";
import { Input, Select } from "../ui/Input";
import { Check, X } from "lucide-react";

function statusBadge(status: string) {
  const base = "inline-flex items-center px-2 py-1 rounded text-xs font-medium";
  switch (status) {
    case StatusEnum.IN_TRANSIT:
      return (
        <span className={`${base} bg-cameroun-yellow/20 text-cameroun-yellow`}>
          {status}
        </span>
      );
    case StatusEnum.IN_WAREHOUSE:
      return (
        <span className={`${base} bg-blue-600/20 text-blue-600`}>{status}</span>
      );
    case StatusEnum.DELIVERED:
      return (
        <span className={`${base} bg-cameroun-green/20 text-cameroun-green`}>
          {status}
        </span>
      );
    case StatusEnum.DELAYED:
      return (
        <span className={`${base} bg-cameroun-red/20 text-cameroun-red`}>
          {status}
        </span>
      );
    default:
      return <span className={`${base} bg-black/20 text-black`}>{status}</span>;
  }
}

// function aiBadge(responded: boolean) {
//   if (responded) {
//     return (
//       <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cameroun-green/20 text-cameroun-green">
//         Répondu
//       </span>
//     );
//   }
//   return (
//     <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
//       En attente
//     </span>
//   );
// }

export default function PackageTable() {
  const [filter, setFilter] = useState("");
  const [packageToView, setPackageToView] = useState<Package | null>(null);
  const [packageToDelete, setPackageToDelete] = useState<Package | null>(null);
  const [packageToUpdate, setPackageToUpdate] = useState<Package | null>(null);
  const {
    listPackage,
    packages,
    loading,
    error,
    updatePackage,
    deletePackage,
    updateStatus,
  } = usePackageStore();

  const filtered = packages?.filter(
    (p) =>
      p.trackingNumber.toLowerCase().includes(filter.toLowerCase()) ||
      p.customerName.toLowerCase().includes(filter.toLowerCase()),
  );
  useEffect(() => {
    listPackage();
  }, []);
  return (
    <div className="w-full relative">
      <div className="mb-4 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Recherche par ID ou destinataire..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-cameroun-green"
        />
        <Button
          variant="cancel"
          onClick={(e) => {
            e.preventDefault();
            listPackage();
          }}
        >
          Rafraichir
        </Button>
      </div>
      <div className="overflow-x-auto">
        {loading && (
          <div className="animate-pulse text-blue-500 flex items-center gap-2 justify-center w-full h-screen z-10 absolute top-0 left-0">
            <div className="flex items-center gap-2 justify-center w-full h-full bg-black opacity-10 absolute" />
            <div className="flex items-center gap-2 justify-center w-full h-full z-10">
              <div className="size-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span>Mise à jour en cours...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <table className="min-w-full bg-white divide-y divide-cameroun-green/30">
          <thead className="bg-cameroun-green/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-cameroun-green uppercase tracking-wider">
                Numero de suivi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cameroun-green uppercase tracking-wider">
                Destinataire
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cameroun-green uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cameroun-green uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cameroun-green uppercase tracking-wider">
                Date de livraison
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-cameroun-green uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-cameroun-green/30">
            {filtered.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-cameroun-green/10">
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm text-cameroun-green cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setPackageToView(pkg);
                  }}
                >
                  <span>{pkg.trackingNumber}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-cameroun-green">
                  {pkg.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-cameroun-green">
                  {pkg.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {packageToUpdate && packageToUpdate.id === pkg.id ? (
                    <p className="flex items-center justify-between gap-1">
                      <Select
                        title="Statut"
                        value={packageToUpdate?.status}
                        items={[
                          { value: "En transit", label: "En transit" },
                          { value: "En entrepôt", label: "En entrepôt" },
                          { value: "Livré", label: "Livré" },
                          { value: "Reçu", label: "Reçu" },
                          { value: "Retard", label: "Retard" },
                        ]}
                        onChange={(e) => {
                          setPackageToUpdate({
                            ...packageToUpdate,
                            status: e.target.value,
                          });
                        }}
                      />
                      <div className="flex items-center gap-1">
                        <Button
                          variant="destructive"
                          className="size-5"
                          onClick={(e) => {
                            e.preventDefault();
                            setPackageToUpdate(null);
                          }}
                        >
                          <X />
                        </Button>
                        <Button
                          variant="primary"
                          className="size-5"
                          onClick={(e) => {
                            e.preventDefault();
                            updateStatus(
                              packageToUpdate.id as number,
                              packageToUpdate.status as PackageStatus,
                            );
                            setPackageToUpdate(null);
                          }}
                        >
                          <Check />
                        </Button>
                      </div>
                    </p>
                  ) : (
                    <p className="flex items-center justify-between gap-1">
                      {statusBadge(pkg.status)}{" "}
                      <span
                        className="flex items-center justify-center cursor-pointer gap-0"
                        onClick={(e) => {
                          e.preventDefault();
                          setPackageToUpdate(pkg);
                        }}
                      >
                        ...
                      </span>{" "}
                    </p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-cameroun-green">
                  {formatDate(pkg.estimatedDelivery)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-cameroun-green">
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      setPackageToDelete(pkg);
                    }}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-sm text-cameroun-green/70"
                >
                  Aucun colis trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        open={!!packageToDelete}
        onClose={() => setPackageToDelete(null)}
        title={`Confirmer la suppression`}
      >
        <div className="space-y-2">
          <p>
            Voulez-vous supprimer le colis {packageToDelete?.trackingNumber} ?
          </p>
          <p>
            <strong>Destinataire:</strong> {packageToDelete?.customerName}
          </p>
          <p>
            <strong>Destination:</strong> {packageToDelete?.destination}
          </p>
          <p className="flex justify-end items-center gap-2 w-full">
            <Button
              variant="cancel"
              onClick={(e) => {
                e.preventDefault();
                setPackageToDelete(null);
              }}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={(e) => {
                e.preventDefault();
                if (packageToDelete) {
                  deletePackage(packageToDelete.id as number);
                  setPackageToDelete(null);
                }
              }}
            >
              Confirmer
            </Button>
          </p>
        </div>
      </Modal>
      <Modal
        open={!!packageToView}
        onClose={() => setPackageToView(null)}
        title={`Détails du colis ${packageToView?.trackingNumber}`}
      >
        {packageToView && (
          <div className="space-y-2">
            <Input
              label="Destinataire"
              title="Destinataire"
              value={packageToView?.customerName}
              onChange={(e) => {
                setPackageToView({
                  ...packageToView,
                  customerName: e.target.value,
                });
              }}
            />
            <Input
              label="Destination"
              title="Destination"
              value={packageToView?.destination}
              onChange={(e) => {
                setPackageToView({
                  ...packageToView,
                  destination: e.target.value,
                });
              }}
            />
            <Select
              label="Statut"
              title="Statut"
              value={packageToView?.status}
              items={[
                { value: "En transit", label: "En transit" },
                { value: "En entrepôt", label: "En entrepôt" },
                { value: "Livré", label: "Livré" },
                { value: "Reçu", label: "Reçu" },
                { value: "Retard", label: "Retard" },
              ]}
              onChange={(e) => {
                setPackageToView({
                  ...packageToView,
                  status: e.target.value,
                });
              }}
            />
            <Input
              label="Date de livraison estimée"
              title="Date de livraison estimée"
              type="datetime-local"
              value={serializeDate(packageToView?.estimatedDelivery) ?? ""}
              onChange={(e) => {
                setPackageToView({
                  ...packageToView,
                  estimatedDelivery: e.target.value,
                });
              }}
            />
            <p className="flex justify-end items-center gap-2 w-full">
              <Button
                variant="cancel"
                onClick={(e) => {
                  e.preventDefault();
                  setPackageToView(null);
                }}
              >
                Annuler
              </Button>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  if (packageToView) {
                    updatePackage(packageToView);
                    setPackageToView(null);
                  }
                }}
              >
                Valider
              </Button>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
