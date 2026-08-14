export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastModel {
  title: string;
  message: string;
  type: ToastType;
  duration: number;
}