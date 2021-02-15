export interface CommandInterface {
    name: string;
    description: string;
    usage: string;
    permissions: Array<PermissionString>;
}
