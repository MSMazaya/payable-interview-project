import md5 from 'md5';

export function md5Hash(str: string) {
    return md5(str);
}

export default {
    md5Hash
}
