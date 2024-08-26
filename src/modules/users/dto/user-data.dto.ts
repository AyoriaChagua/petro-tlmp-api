export class RoleDto {
    id: number;
    description: string;
}

export class UserWithRolesDto {
    id: string;
    description: string;
    isActive: boolean;
    userRoles: RoleDto[];
}