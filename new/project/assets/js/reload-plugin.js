export default ({ app }) => {
    if (process.client) {
      location.reload();
    }
  };