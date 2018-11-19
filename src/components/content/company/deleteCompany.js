import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import axios from "axios";
import apiconfig from "../../../config/api.config.json";

import { delCompanies } from "../../../actions/companyActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

class DeleteCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  deleteHandler() {
    this.props.delCompanies(this.props.company.code);
    this.props.closeModalHandler();
  }

  componentWillReceiveProps(newStatus) {
    this.setState({
      status: newStatus.bujang.statusDEL
    });
  }

  render() {
    this.state.status == 200
      ? this.props.modalStatus(1, "Deleted!", this.props.company.code)
      : console.log(this.state.status);

    return (
      <Modal isOpen={this.props.delete} className={this.props.className}>
        <ModalHeader> Delete Company </ModalHeader>
        <ModalBody>
          <p>
            Are you sure want delete <strong>{this.props.company.name}</strong>{" "}
            Company ?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.deleteHandler}>
            Yes
          </Button>
          <Button color="danger" onClick={this.props.closeModalHandler}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

DeleteCompany.propTypes = {
  delCompanies: PropTypes.func.isRequired,
  bujang: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bujang: state.compay
});

export default connect(
  mapStateToProps,
  { delCompanies }
)(DeleteCompany);
