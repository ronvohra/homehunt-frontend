import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IValues {
    url: string,
    streetAddress: string,
    numBedrooms: number,
    numBathrooms: number,
    nearestStation: string,
    walkTimeToStation: number,
    directCentralStation: string,
    timeToCentral: number,
    notes: string,
}
export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            url: '',
            streetAddress: '',
            numBedrooms: '',
            numBathrooms: '',
            nearestStation: '',
            walkTimeToStation: '',
            directCentralStation: '',
            timeToCentral: '',
            notes: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {
            url: this.state.url,
            streetAddress: this.state.streetAddress,
            numBedrooms: this.state.numBedrooms,
            numBathrooms: this.state.numBathrooms,
            nearestStation: this.state.nearestStation,
            walkTimeToStation: this.state.walkTimeToStation,
            directCentralStation: this.state.directCentralStation,
            timeToCentral: this.state.timeToCentral,
            notes: this.state.notes,
        }
        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
        axios.post(`http://localhost:8080/home`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }
    
    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div>
                <div className={"col-md-12 form-wrapper"}>
                    <h2> Create Post </h2>
                    {!submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            Fill the form below to create a new home
                    </div>
                    )}
                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                            </div>
                    )}
                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="url"> URL </label>
                            <input type="text" id="url" onChange={(e) => this.handleInputChanges(e)} name="url" className="form-control" placeholder="Enter Zoopla URL for home" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="streetAddress"> Street Address </label>
                            <input type="text" id="streetAddress" onChange={(e) => this.handleInputChanges(e)} name="streetAddress" className="form-control" placeholder="Enter home's street address" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="numBedrooms"> Number of bedrooms </label>
                            <input type="number" min="0" max="99" step="1" id="numBedrooms" onChange={(e) => this.handleInputChanges(e)} name="numBedrooms" className="form-control" placeholder="Enter number of bedrooms in home" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="numBathrooms"> Number of bathrooms </label>
                            <input type="number" min="0" max="99" step="1" id="numBathrooms" onChange={(e) => this.handleInputChanges(e)} name="numBathrooms" className="form-control" placeholder="Enter number of bathrooms in home" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="nearestStation"> Nearest station </label>
                            <input type="text" id="nearestStation" onChange={(e) => this.handleInputChanges(e)} name="nearestStation" className="form-control" placeholder="Enter nearest station to home" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="walkTimeToStation"> Walk time to station (mins) </label>
                            <input type="number" min="0" max="99" step="1" id="walkTimeToStation" onChange={(e) => this.handleInputChanges(e)} name="walkTimeToStation" className="form-control" placeholder="Enter walk time from home to station (mins)" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="directCentralStation"> Central London station with direct train </label>
                            <input type="text" id="directCentralStation" onChange={(e) => this.handleInputChanges(e)} name="directCentralStation" className="form-control" placeholder="Enter Central London station name with direct access" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="timeToCentral"> Train travel time to Central London </label>
                            <input type="number" min="0" max="99" step="1" id="timeToCentral" onChange={(e) => this.handleInputChanges(e)} name="timeToCentral" className="form-control" placeholder="Enter train travel time to Central London (mins)" />
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="notes"> Notes </label>
                            <input type="text" id="notes" onChange={(e) => this.handleInputChanges(e)} name="notes" className="form-control" placeholder="Enter any comments about this home" />
                        </div>
                        <div className="form-group col-md-4 pull-right">
                            <button className="btn btn-success" type="submit">
                                Create Home
                            </button>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Create)
