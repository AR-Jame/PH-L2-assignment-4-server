import mongoose from "mongoose";
import 'dotenv/config'
import app from "./app";
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('I am working')
})

main().catch(err => console.log(err));
async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r9h20.mongodb.net/Library_management?retryWrites=true&w=majority&appName=Cluster0`);
        app.listen(PORT, () => {
            console.log(`App is running on port ${PORT}`);
            console.log('Mongodb is perfectly connected');
        })
    } catch (error) {
        console.log(error);
    }
}