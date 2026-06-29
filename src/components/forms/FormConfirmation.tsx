import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Button from "../ui/Button";

export default function FormConfirmation({
  title,
  message,
  onReset,
}: {
  title: string;
  message: string;
  onReset: () => void;
}) {
  return (
    <motion.div
      key="confirmation"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center py-10 text-center"
    >
      <CheckCircle2 size={56} className="text-metro-orange-500" />
      <h3 className="mt-4 font-display text-2xl font-semibold text-metro-navy-800">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-metro-grey-500">{message}</p>
      <Button type="button" variant="secondary" className="mt-6" onClick={onReset}>
        Submit Another Request
      </Button>
    </motion.div>
  );
}
