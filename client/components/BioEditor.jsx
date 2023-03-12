import { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

export default function BioEditor(props) {
    const [draft, setDraft] = useState(props.bio);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(false);

    const updateDraft = (e) => {
        console.log("'updateDraft()' was triggered. Input field: ", e.currentTarget.value);

        setDraft(e.currentTarget.value);
    };

    const submitBio = (e) => {
        e.preventDefault();

        const bioDraft = { bio: draft };

        console.log("'submitBio()' was triggered. New draft is: ", bioDraft);

        fetch('/bio.json', {
            method: 'POST',
            body: JSON.stringify(bioDraft),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                console.log('response is: ', response.ok);

                if (response.ok) {
                    // If fetch request isSuccess, set isEditing to 'false'
                    console.log('/bio.json this.props', props);

                    props.bioUpdated(bioDraft.bio);
                    setIsEditing(false);

                    console.log("'fetch in <Bioeditor> isSuccess");
                } else {
                    setError(true);
                }
            });
    };

    const addBio = (e) => {
        e.preventDefault();
        setIsEditing(true);
    };

    // Add error handling for invalid bio prop
    const bioText = typeof props.bio === 'string' ? props.bio : 'Write a description.';

    return (
        <Box>
            {isEditing ? (
                <form onSubmit={submitBio}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Bio"
                        variant="outlined"
                        value={draft}
                        onChange={updateDraft}
                        error={error}
                        helperText={error && 'Please enter a valid bio'}
                    />

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="primary" type="submit">
              Save
                        </Button>

                        <Button variant="outlined" color="primary" onClick={() => setIsEditing(false)}>
              Cancel
                        </Button>
                    </Box>

                    {error && (
                        <p>
              Something went wrong while saving BioEditor. Please try again.
                        </p>
                    )}
                </form>
            ) : (
                <>
                    <p>{bioText}</p>

                    <Box sx={{ mt: 2 }}>
                        <Button variant="outlined" color="primary" onClick={addBio}>
              Edit Bio
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}