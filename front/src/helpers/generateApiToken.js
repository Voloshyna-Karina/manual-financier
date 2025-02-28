export default function generateApiToken() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const sections = [];
    for (let i = 0; i < 5; i++) {
        let section = '';
        const length = i === 4 ? 12 : 4;
        for (let j = 0; j < length; j++) {
            section += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        sections.push(section);
    }
    return sections.join('-');
}