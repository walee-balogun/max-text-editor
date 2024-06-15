
const init = ({ diContainer }) => {

    const app = diContainer.resolve('app');
    const documentRoutes = diContainer.resolve('documentRoutes');

    app.use('/api/documents', documentRoutes);

}

module.exports = Object.assign({}, { init });