export type BaseModalProps = {
  show: boolean;
  onHide: () => void;
  text?: string;
  children?: React.ReactNode;
};
