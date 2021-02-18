import React, { Fragment, ReactElement, ReactNode } from "react";
import "./_style.scss";
import Icon from "../Icon";
import ReactDOM from "react-dom";

interface Props {
  visible: boolean;
  buttons?: Array<ReactElement>;
  onClose: React.MouseEventHandler;
  closeOnClickMask?: boolean;
}

const Dialog: React.FunctionComponent<Props> = (props) => {
  const onClickClose: React.MouseEventHandler = (e) => {
    props.onClose(e);
  };
  const onClickMask: React.MouseEventHandler = (e) => {
    if (props.closeOnClickMask) {
      props.onClose(e);
    }
  };
  const result = props.visible && (
    <Fragment>
      <div className="yc-dialog-mask" onClick={onClickMask} />
      <div className="yc-dialog">
        <div className="yc-dialog-close" onClick={onClickClose}>
          <Icon
            icon="times"
            size="sm"
            theme="dark"
            className="yc-dialog-close-icon"
          />
        </div>
        <header className="yc-dialog-header">提示</header>
        <main className="yc-dialog-main">{props.children}</main>
        {props.buttons && props.buttons.length > 0 && (
          <footer className="yc-dialog-footer">
            {props.buttons &&
              props.buttons.map((button, index) =>
                React.cloneElement(button, { key: index })
              )}
          </footer>
        )}
      </div>
    </Fragment>
  );
  return ReactDOM.createPortal(result, document.body);
};
Dialog.defaultProps = {
  closeOnClickMask: false,
};
const modal = (
  content: ReactNode,
  buttons?: Array<ReactElement>,
  afterClose?: () => void
) => {
  const close = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div);
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  };
  const component = (
    <Dialog
      visible={true}
      buttons={buttons}
      onClose={() => {
        close();
        afterClose && afterClose();
      }}
    >
      {content}
    </Dialog>
  );
  const div = document.createElement("div");
  document.body.append(div);
  ReactDOM.render(component, div);
  return close;
};
const alert = (content: string) => {
  const button = <button onClick={() => close()}>OK</button>;
  const close = modal(content, [button]);
};
const confirm = (content: string, yes?: () => void, no?: () => void) => {
  const onYes = () => {
    close();
    yes && yes();
  };
  const onNo = () => {
    close();
    no && no();
  };
  const buttons = [
    <button onClick={onYes}>yes</button>,
    <button onClick={onNo}>no</button>,
  ];
  const close = modal(content, buttons, no);
};
export { alert, confirm, modal };
export default Dialog;
