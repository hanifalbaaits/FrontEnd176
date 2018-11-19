import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import { putCompanies } from "../../../actions/companyActions";
import TextField from "@material-ui/core/TextField";
import apiconfig from "../../../config/api.config.json";
import { connect } from "react-redux";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class EditCompany extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    // super(props);
    this.state = {
      formdata: {
        code: "",
        name: "",
        email: "",
        province: "",
        city: "",
        address: "",
        phone: "",
        update_by: userdata.usename
      },
      status: "",
      alertData: {
        status: false,
        message: ""
      }
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    let tmp = this.state.formdata;
    tmp[e.target.name] = e.target.value;
    this.setState({
      formdata: tmp,
      alertData: {
        status: false,
        message: ""
      }
    });
  }

  validateEmail(email) {
    let regex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regex.test(String(email).toLowerCase());
  }

  validatePhone(phone) {
    let regex = new RegExp(/^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g);
    return regex.test(phone);
  }

  submitHandler() {
    if (
      this.state.formdata.name === "" ||
      this.state.formdata.email === "" ||
      this.state.formdata.phone === "" ||
      this.state.formdata.address === ""
    ) {
      this.setState({
        alertData: {
          status: true,
          message: "all forms must be filled!"
        }
      });
    } else if (this.validateEmail(this.state.formdata.email) === false) {
      this.setState({
        alertData: {
          status: true,
          message: "invalid email format,type in the email section correctly!"
        }
      });
    } else if (this.validatePhone(this.state.formdata.phone) === false) {
      this.setState({
        alertData: {
          status: true,
          message:
            "invalid phone number format,type in the phone number section correctly!"
        }
      });
    } else {
      this.props.putCompanies(this.state.formdata);
      this.props.closeModalHandler();
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      formdata: newProps.companytest,
      status: newProps.bujang.statusPUT
    });
  }

  render() {
    const { classes } = this.props;
    this.state.status == 200
      ? this.props.modalStatus(1, "Updated!", this.state.formdata.code)
      : console.log(this.state.status);
    return (
      <Modal isOpen={this.props.edit} className={this.props.className}>
        <ModalHeader> Edit Company</ModalHeader>
        <ModalBody>
          {/* className={classes.container} */}
          <form>
            <TextField
              name="name"
              label="Name Company"
              // className={classes.textField}
              value={this.state.formdata.name}
              onChange={this.changeHandler}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-email-input"
              label="Email"
              // className={classes.textField}
              type="email"
              name="email"
              value={this.state.formdata.email}
              onChange={this.changeHandler}
              autoComplete="email"
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="address"
              label="Address"
              defaultValue="Default Value"
              rows="4"
              value={this.state.formdata.address}
              onChange={this.changeHandler}
              // className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="phone"
              label="Phone Number"
              // className={classes.textField}
              value={this.state.formdata.phone}
              onChange={this.changeHandler}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </form>
          {this.state.alertData.status == true ? (
            <Alert color="danger">{this.state.alertData.message} </Alert>
          ) : (
            ""
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitHandler}
          >
            Save
          </Button>
          <Button variant="contained" onClick={this.props.closeModalHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

EditCompany.propTypes = {
  classes: PropTypes.object.isRequired,
  putCompanies: PropTypes.func.isRequired,
  bujang: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  bujang: state.compay
});

export default connect(
  mapStatetoProps,
  { putCompanies }
)(EditCompany);
