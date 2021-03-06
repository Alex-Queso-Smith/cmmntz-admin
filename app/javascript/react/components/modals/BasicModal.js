import React from 'react';
import Modal from './Modal'

class BasicModal extends React.Component {
  state = {
    show: false
  }
  showModal = this.showModal.bind(this);
  hideModal = this.hideModal.bind(this);
  handleOutsideClick = this.handleOutsideClick.bind(this);

  showModal(event){
    event.preventDefault();

    this.setState({ show: true });
    document.addEventListener('click', this.handleOutsideClick, false)
    document.body.classList.add("cf-modal-locked");
  }

  hideModal(event){
    event.preventDefault();

    this.setState({ show: false });
    document.removeEventListener('click', this.handleOutsideClick, false)
    document.body.classList.remove("cf-modal-locked");
  }

  handleOutsideClick(event) {
    if (!event.target.classList.value.includes("cf-modal-container")) {
      return;
    } else {
      this.hideModal(event);
    }
  }

  render() {
    var modalWindow;
    if (this.state.show) {
      modalWindow =
      <Modal
        show={this.state.show}
        handleClose={this.hideModal}
        modalTitle={this.props.modalTitle}
      >
        {this.props.children}
      </Modal>
    }
    const style = {
      display: "inline"
    }
    return(
      <div style={style}>
        {modalWindow}
        <button onClick={this.showModal} className={`btn btn-md margin-all-5px ${this.props.modalButtonClass}`}>
          {this.props.modalButtonText}
        </button>
      </div>
    );
  }
}

export default BasicModal;
