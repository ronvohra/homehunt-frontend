import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    [key: string]: any;
}
export interface IFormState {
    id: number,
    home: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class EditHome extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            home: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/home/${this.state.id}`).then(data => {
            this.setState({ home: data.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.put(`${process.env.REACT_APP_BACKEND_BASE_URL}/home/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }

    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }
    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.home &&
                    <div>
                        < h1 > Homehunt</h1>
                        <p> Built with React.js and TypeScript </p>

                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Edit Home </h2>
                                {submitSuccess && (
                                    <div className="alert alert-info" role="alert">
                                        Home has been edited successfully </div>
                                )}
                                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="url"> URL </label>
                                        <input type="text" id="url" defaultValue={this.state.home.url} onChange={(e) => this.handleInputChanges(e)} name="url" className="form-control" placeholder="Enter Zoopla URL for home" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="rent"> Rent in £ (pcm) </label>
                                        <input type="number" min="0" max="9999" step="1" id="rent" defaultValue={this.state.home.rent} onChange={(e) => this.handleInputChanges(e)} name="rent" className="form-control" placeholder="Enter rent in £ (pcm)" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="streetAddress"> Street Address </label>
                                        <input type="text" id="streetAddress" defaultValue={this.state.home.streetAddress} onChange={(e) => this.handleInputChanges(e)} name="streetAddress" className="form-control" placeholder="Enter home's street address" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="numBedrooms"> Number of bedrooms </label>
                                        <input type="number" min="0" max="99" step="1" id="numBedrooms" defaultValue={this.state.home.numBedrooms} onChange={(e) => this.handleInputChanges(e)} name="numBedrooms" className="form-control" placeholder="Enter number of bedrooms in home" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="numBathrooms"> Number of bathrooms </label>
                                        <input type="number" min="0" max="99" step="1" id="numBathrooms" defaultValue={this.state.home.numBathrooms} onChange={(e) => this.handleInputChanges(e)} name="numBathrooms" className="form-control" placeholder="Enter number of bathrooms in home" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="nearestStation"> Nearest station </label>
                                        <input type="text" id="nearestStation" defaultValue={this.state.home.nearestStation} onChange={(e) => this.handleInputChanges(e)} name="nearestStation" className="form-control" placeholder="Enter nearest station to home" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="walkTimeToStation"> Walk time to station (mins) </label>
                                        <input type="number" min="0" max="99" step="1" id="walkTimeToStation" defaultValue={this.state.home.walkTimeToStation} onChange={(e) => this.handleInputChanges(e)} name="walkTimeToStation" className="form-control" placeholder="Enter walk time from home to station (mins)" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="directCentralStation"> Central London station with direct train </label>
                                        <input type="text" id="directCentralStation" defaultValue={this.state.home.directCentralStation} onChange={(e) => this.handleInputChanges(e)} name="directCentralStation" className="form-control" placeholder="Enter Central London station name with direct access" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="timeToCentral"> Train travel time to Central London </label>
                                        <input type="number" min="0" max="99" step="1" id="timeToCentral" defaultValue={this.state.home.timeToCentral} onChange={(e) => this.handleInputChanges(e)} name="timeToCentral" className="form-control" placeholder="Enter train travel time to Central London (mins)" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="notes"> Notes </label>
                                        <input type="text" id="notes" defaultValue={this.state.home.notes} onChange={(e) => this.handleInputChanges(e)} name="notes" className="form-control" placeholder="Enter any comments about this home" />
                                    </div>
                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Edit Home </button>
                                        {loading &&
                                            <span className="fa fa-circle-o-notch fa-spin" />
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default withRouter(EditHome)
