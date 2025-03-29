export const articleContentStyles = {
    '& h1': {
        fontSize: '2em',
        marginTop: '1em',
        marginBottom: '0.5em',
        fontWeight: 'bold',
    },
    '& h2': {
        fontSize: '1.5em',
        marginTop: '0.8em',
        marginBottom: '0.4em',
        fontWeight: 'bold',
    },
    '& h3': {
        fontSize: '1.2em',
        marginTop: '0.6em',
        marginBottom: '0.3em',
        fontWeight: 'bold',
    },
    '& p': {
        marginBottom: '1em',
        lineHeight: '1.6',
    },
    '& img': {
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
        margin: '1em auto',
    },
    '& table': {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '1em 0',
    },
    '& td': {
        padding: '0.5em',
        border: '1px solid #ddd',
    },
    '& strong': {
        fontWeight: 'bold',
    },
    '& em': {
        fontStyle: 'italic',
    },
    '& a': {
        color: 'blue.500',
        textDecoration: 'underline',
        '&:hover': {
            color: 'blue.600',
        },
    },
    '& ul, & ol': {
        marginLeft: '1em',
        marginBottom: '1em',
        paddingLeft: '1em',
    },
    '& li': {
        marginBottom: '0.5em',
    },
    '& blockquote': {
        borderLeft: '4px solid #ddd',
        paddingLeft: '1em',
        marginLeft: '0',
        color: '#666',
    },
} 