import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  usePackageStore,
  type PackageStatus,
} from "../../store/usePackageStore";
import { StatusEnum } from "../../core/enum";
import Button from "../ui/Button";
import { formatDate } from "../../utils/date-format";

function statusBadge(status: PackageStatus) {
  const base =
    "inline-flex items-center px-2 py-1 rounded text-xs font-medium";
  switch (status) {
    case StatusEnum.IN_TRANSIT:
      return (
        <span className={`${base} bg-cameroun-yellow/20 text-cameroun-yellow`}>
          {status}
        </span>
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
        return (<span className={`${base} bg-black/20 text-black`}>
          {status}
        </span>)
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
  const { listPackage, packages, loading, error, success, deletePackage } =
    usePackageStore();

  const filtered = packages?.filter(
    (p) =>
      p.trackingNumber.toLowerCase().includes(filter.toLowerCase()) ||
      p.customerName.toLowerCase().includes(filter.toLowerCase()),
  );
  useEffect(() => {
    listPackage();
  }, []);
  return (
    <div className="w-full">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Recherche par ID ou destinataire..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-cameroun-green"
        />
      </div>
      <div className="overflow-x-auto">
        {/* Feedback UI avec Tailwind */}
        {loading && (
          <div className="animate-pulse text-blue-500">
            Mise à jour en cours...
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-cameroun-green">
                  <Link to={`${pkg.trackingNumber}`}>{pkg.trackingNumber}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-cameroun-green">
                  {pkg.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-cameroun-green">
                  {pkg.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {statusBadge(pkg.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-cameroun-green">
                  {formatDate(pkg.estimatedDelivery)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-cameroun-green">
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      deletePackage(pkg.id);
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
    </div>
  );
}
