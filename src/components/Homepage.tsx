import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

interface IState {
    homes: any[];
}

export default class Homepage extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { homes: [] }
    }
    public componentDidMount(): void {
        axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/home`).then(data => {
            this.setState({ homes: data.data })
        })
    }
    public deleteHome(id: number) {
        axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/home/${id}`).then(data => {
            const index = this.state.homes.findIndex(home => home.id === id);
            this.state.homes.splice(index, 1);
            this.props.history.push('/');
        })
    }

    public render() {
        const homes = this.state.homes;
        return (
            <div>
                {homes.length === 0 && (
                    <div className="text-center">
                        <h2>No home found at the moment</h2>
                    </div>
                )}
                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">URL</th>
                                    <th scope="col">Street Address</th>
                                    <th scope="col">Bedrooms</th>
                                    <th scope="col">Bathrooms</th>
                                    <th scope="col">Nearest Station</th>
                                    <th scope="col">Time to Station (mins)</th>
                                    <th scope="col">Direct Central Station</th>
                                    <th scope="col">Time to Central London (mins)</th>
                                    <th scope="col">Notes</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {homes && homes.map(home =>
                                    <tr key={home.id}>
                                        <td>{home.url}</td>
                                        <td>{home.streetAddress}</td>
                                        <td>{home.numBedrooms}</td>
                                        <td>{home.numBathrooms}</td>
                                        <td>{home.nearestStation}</td>
                                        <td>{home.walkTimeToStation}</td>
                                        <td>{home.directCentralStation}</td>
                                        <td>{home.timeToCentral}</td>
                                        <td>{home.notes}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${home.id}`} className="btn btn-sm btn-outline-secondary">Edit Home </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteHome(home.id)}>Delete Home</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
