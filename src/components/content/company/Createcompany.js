import React from "react";
import ReactDOM from "react-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import apiconfig from "../../../config/api.config.json";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { createCompanies } from "../../../actions/companyActions";
// import PropTypes from "prop-types";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class CreateCompany extends React.Component {
  constructor(props) {
    super(props);
    let userdata = JSON.parse(localStorage.getItem(apiconfig.LS.USERDATA));
    this.state = {
      formdata: {
        code: "",
        name: "",
        email: "",
        province: "",
        city: "",
        address: "",
        phone: "",
        created_by: userdata.username
      },
      status: "",
      alertData: {
        status: false,
        message: ""
      },
      labelWidth: 0,
      prov: [],
      city: []
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidMount() {
    this.getListProvince();
    this.getListCity();
  }

  changeHandler(e) {
    let tmp = this.state.formdata;
    tmp[e.target.name] = e.target.value;
    this.setState({
      alertData: {
        status: false,
        message: ""
      },
      formdata: tmp
    });
  }

  getListProvince() {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.ADDRESS.PROVINCE,
      method: "get",
      headers: {
        Authorization: token
      }
    };
    axios(option)
      .then(response => {
        this.setState({
          prov: response.data.message
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  getListCity() {
    let token = localStorage.getItem(apiconfig.LS.TOKEN);
    let option = {
      url: apiconfig.BASE_URL + apiconfig.ENDPOINTS.ADDRESS.CITY,
      method: "get",
      headers: {
        Authorization: token
      }
    };
    axios(option)
      .then(response => {
        this.setState({
          city: response.data.message
        });
      })
      .catch(error => {
        console.log(error);
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
      this.state.formdata.address === "" ||
      this.state.formdata.province === "" ||
      this.state.formdata.city === ""
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
      this.props.createCompanies(this.state.formdata);
      this.props.closeHandler();
    }
  }

  componentWillReceiveProps(newStatus) {
    this.setState({
      status: newStatus.bujang.statusADD
    });
  }

  render() {
    const { classes } = this.props;
    this.state.status == 200
      ? this.props.modalStatus(1, "Created!", this.state.formdata.code)
      : console.log(this.state.status);
    return (
      <Modal isOpen={this.props.create} className={this.props.className}>
        <ModalHeader> Add Company</ModalHeader>
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
              name="phone"
              label="Phone Number"
              // className={classes.textField}
              value={this.state.formdata.phone}
              onChange={this.changeHandler}
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
            {/* className={classes.formControl} */}
            <formControl variant="outlined">
              <InputLabel htmlFor="province">Province</InputLabel>
              <Select
                value={this.state.formdata.province}
                onChange={this.changeHandler}
                input={
                  <OutlinedInput
                    name="province"
                    labelWidth={this.state.labelWidth}
                    id="province"
                  />
                }
              >
                {this.state.prov.map((row, index) => {
                  return <MenuItem value={row.name_p}>{row.name_p}</MenuItem>;
                })}
              </Select>

              <InputLabel htmlFor="city">City</InputLabel>
              <Select
                value={this.state.formdata.city}
                onChange={this.changeHandler}
                input={
                  <OutlinedInput
                    name="city"
                    labelWidth={this.state.labelWidth}
                    id="city"
                  />
                }
              >
                {this.state.city.map((row, index) => {
                  return <MenuItem value={row.name_c}>{row.name_c}</MenuItem>;
                })}
              </Select>
            </formControl>
          </form>
        </ModalBody>
        <ModalFooter>
          {this.state.alertData.status == true ? (
            <Alert color="danger">{this.state.alertData.message} </Alert>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={this.submitHandler}
          >
            Save
          </Button>
          <Button variant="contained" onClick={this.props.closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

CreateCompany.propTypes = {
  classes: PropTypes.object.isRequired,
  createCompanies: PropTypes.func.isRequired,
  bujang: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bujang: state.compay
});

export default connect(
  mapStateToProps,
  { createCompanies }
)(CreateCompany);
