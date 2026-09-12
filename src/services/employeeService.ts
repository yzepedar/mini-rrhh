import { apiClient } from './api';
import type { Employee, CreateEmployeeDto, UpdateEmployeeDto, PaginatedResponse } from '../types';
import mockDatabase from '../db.json';

const useLocalData = import.meta.env.PROD && !import.meta.env.VITE_API_URL;
let localEmployees: Employee[] = mockDatabase.employees as Employee[];

const getLocalEmployees = (filters: EmployeeFilters): PaginatedResponse<Employee> => {
    const filteredEmployees = localEmployees.filter((employee) => {
        const matchesSearch = !filters.search ||
            `${employee.name} ${employee.email} ${employee.position}`
                .toLowerCase()
                .includes(filters.search.toLowerCase());
        const matchesDepartment = !filters.department || employee.department === filters.department;
        const matchesStatus = !filters.status || employee.status === filters.status;
        return matchesSearch && matchesDepartment && matchesStatus;
    });
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 10;
    const start = (page - 1) * pageSize;

    return {
        data: filteredEmployees.slice(start, start + pageSize),
        total: filteredEmployees.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredEmployees.length / pageSize),
    };
};

export interface EmployeeFilters {
    search?: string; department?: string; status?: string; page?: number; pageSize?: number;
}
export const employeeService = {
    getAll: async (filters: EmployeeFilters = {}): Promise<PaginatedResponse<Employee>> => {
        if (useLocalData) return getLocalEmployees(filters);

        const params = new URLSearchParams();
        if (filters.search) params.set('q', filters.search);
        if (filters.department) params.set('department', filters.department);
        if (filters.status) params.set('status', filters.status);
        if (filters.page) params.set('_page', String(filters.page));
        if (filters.pageSize) params.set('_limit', String(filters.pageSize));

        const response = await apiClient.get<Employee[]>(`/employees?${params}`);
        const total = parseInt(response.headers['x-total-count'] || '0', 10);
        return {
            data: response.data, total,
            page: filters.page || 1, pageSize: filters.pageSize || 10,
            totalPages: Math.ceil(total / (filters.pageSize || 10)),
        };
    },
    // Obtener uno por ID
    getById: async (id: number): Promise<Employee> => {
        if (useLocalData) {
            const employee = localEmployees.find((item) => item.id === id);
            if (!employee) throw new Error('Empleado no encontrado');
            return employee;
        }

        const response = await apiClient.get<Employee>(`/employees/${id}`);
        return response.data;
    },
    create: async (data: CreateEmployeeDto): Promise<Employee> => {
        if (useLocalData) {
            const employee = { ...data, id: Math.max(0, ...localEmployees.map((item) => item.id)) + 1 };
            localEmployees = [...localEmployees, employee];
            return employee;
        }

        const response = await apiClient.post<Employee>('/employees', data);
        return response.data;
    },
    // Actualizar empleado (PATCH, no PUT — data es parcial y json-server
    // reemplazaría el recurso completo con un PUT, perdiendo los campos que no se envían)
    update: async (id: number, data: UpdateEmployeeDto): Promise<Employee> => {
        if (useLocalData) {
            const employee = localEmployees.find((item) => item.id === id);
            if (!employee) throw new Error('Empleado no encontrado');
            const updatedEmployee = { ...employee, ...data };
            localEmployees = localEmployees.map((item) => item.id === id ? updatedEmployee : item);
            return updatedEmployee;
        }

        const response = await apiClient.patch<Employee>(`/employees/${id}`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        if (useLocalData) {
            localEmployees = localEmployees.filter((item) => item.id !== id);
            return;
        }

        await apiClient.delete(`/employees/${id}`);
    },
};