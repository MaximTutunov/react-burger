export const CLOSE_ORDER_INFO_MODAL: "CLOSE_ORDER_INFO_MODAL" =
  "CLOSE_ORDER_INFO_MODAL";

export type TCloseOrderInfoModalAction = ICloseOrderInfoModal;

export interface ICloseOrderInfoModal {
  readonly type: typeof CLOSE_ORDER_INFO_MODAL;
}
export const closeOrderInfoModal = (): ICloseOrderInfoModal => {
  return {
    type: CLOSE_ORDER_INFO_MODAL,
  };
};
