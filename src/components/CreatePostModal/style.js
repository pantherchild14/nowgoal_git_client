const useStyles = () => ({
    paper: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
        width: 400,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        margin: '0 0 10px 0',
    },
    title: {
        marginBottom: '10px',
    },
    textarea: {
        padding: '10px',
        marginBottom: '10px',
    },
    footer: {
        marginTop: '10px',
    },
});

export default useStyles;