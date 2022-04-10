export type Color = 'success' | 'danger';

interface ToastInterface {
  id: string;
  color: Color;
  title: string;
  body?: string;
}

export default ToastInterface;
