export { ReactComponent as DigitaloceanIcon } from './../icons/digitalocean.svg';
import { ReactComponent as kubernetesIcon } from './../icons/kubernetes.svg';

export const Kubernetes = () => (
  <div className="text-red-500"> {/* Use Tailwind CSS classes for styling */}
    <img src={KubernetesIcon} alt="Kubernetes Icon" className="w-8 h-8" />
  </div>
);