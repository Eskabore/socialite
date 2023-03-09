import { Component } from 'react';

export default class BioEditor extends Component {
    constructor (props) {
        super(props);

        this.state = {

            draft: this.props.bio,
            isEditing: false,
            error: false
        };

        this.updateDraft = this.updateDraft.bind(this);
        this.submitBio = this.submitBio.bind(this);
        this.addBio = this.addBio.bind(this);
    }

    updateDraft(e) {
        console.log("'Update darft()' was triggered. Input field: ", e.currentTarget.value);

        this.setState( { draft: e.currentTarget.value } );
    }

    submitBio(e) {
        e.preventDefault();

        const bioDraft = { bio: this.state.draft };

        console.log("'submitBio()' was triiggered. New draft is: ", bioDraft);

        fetch('/bio.json', {
            method: 'POST',
            body: JSON.stringify(bioDraft),
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => {
                console.log("response is: ", response.ok);

                if (response.ok) {
                // If fetch request isSuccess, set isEditing to 'false'
                    console.log("/bio.json rhis.props", this.props);

                    this.props.bioUpdated(bioDraft.bio);
                    this.setState( { isEditing: false });

                    console.log("'fetch in <Bioeditor> isSuccess");

                } else {

                    this.setState( { error: true });
                }
            });
    }

    addBio(e) {
        e.preventDefault();
        this.setState( { isEditing: true });
    }

    render() {
        // If the bio being edited
        if ( this.state.isEditing ) {

            return(
                <div>
                    <textarea
                        value={ this.state.draft }
                        onChange={ this.updateDraft }
                    />
                    <button
                        onClick={ this.submitBio }
                    >
                        SAVE
                    </button>

                    {
                        this.state.error && (
                            <p>
                                Something went wrong while saving BioEditor. Please try again.
                            </p>
                        )
                    }
                </div>
            );

            // User is not editing & has bio
        } else if ( this.props.bio ) {

            return(
                <div>
                    <p>
                        { this.props.bio }
                    </p>

                    <button
                        onClick={ this.addBio }
                    >
                        Edit Bio
                    </button>
                </div>
            );
        } else {

            // User is not editing & has no bio
            return(
                <div>
                    <p>
                    Write a description.
                    </p>
                    <button
                        onClick={ this.addBio }
                    >
                    Add  Bio
                    </button>
                </div>
            );
        }
    }
}