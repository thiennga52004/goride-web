import { TripStatus, UserStatus, ApprovalStatus } from '../constants/enums';

const STATUS_CONFIG = {
  // Trip statuses
  [TripStatus.SEARCHING]: { color: 'var(--accent-blue)', label: 'Đang tìm', bgColor: 'rgba(59, 130, 246, 0.15)' },
  [TripStatus.ACCEPTED]: { color: 'var(--accent-purple)', label: 'Đã nhận', bgColor: 'rgba(139, 92, 246, 0.15)' },
  [TripStatus.ARRIVED]: { color: 'var(--accent-yellow)', label: 'Đã đến', bgColor: 'rgba(245, 158, 11, 0.15)' },
  [TripStatus.IN_PROGRESS]: { color: 'var(--accent-blue)', label: 'Đang đi', bgColor: 'rgba(59, 130, 246, 0.15)' },
  [TripStatus.COMPLETED]: { color: 'var(--accent-green)', label: 'Hoàn thành', bgColor: 'rgba(0, 229, 160, 0.15)' },
  [TripStatus.CANCELLED]: { color: 'var(--accent-red)', label: 'Đã hủy', bgColor: 'rgba(239, 68, 68, 0.15)' },
  [TripStatus.NO_DRIVER]: { color: 'var(--text-tertiary)', label: 'Không có tài xế', bgColor: 'rgba(90, 95, 122, 0.15)' },

  // User statuses
  [UserStatus.ACTIVE]: { color: 'var(--accent-green)', label: 'Hoạt động', bgColor: 'rgba(0, 229, 160, 0.15)' },
  [UserStatus.SUSPENDED]: { color: 'var(--accent-red)', label: 'Đã khóa', bgColor: 'rgba(239, 68, 68, 0.15)' },

  // Approval statuses
  [ApprovalStatus.PENDING]: { color: 'var(--accent-yellow)', label: 'Chờ duyệt', bgColor: 'rgba(245, 158, 11, 0.15)' },
  [ApprovalStatus.APPROVED]: { color: 'var(--accent-green)', label: 'Đã duyệt', bgColor: 'rgba(0, 229, 160, 0.15)' },
  [ApprovalStatus.REJECTED]: { color: 'var(--accent-red)', label: 'Từ chối', bgColor: 'rgba(239, 68, 68, 0.15)' },
};

/**
 * Get the color for a given status
 */
export const getStatusColor = (status) => {
  return STATUS_CONFIG[status]?.color || 'var(--text-secondary)';
};

/**
 * Get the Vietnamese label for a given status
 */
export const getStatusLabel = (status) => {
  return STATUS_CONFIG[status]?.label || status;
};

/**
 * Get the background color for a given status
 */
export const getStatusBgColor = (status) => {
  return STATUS_CONFIG[status]?.bgColor || 'rgba(139, 143, 163, 0.15)';
};

/**
 * Get the full status config
 */
export const getStatusConfig = (status) => {
  return STATUS_CONFIG[status] || { color: 'var(--text-secondary)', label: status, bgColor: 'rgba(139, 143, 163, 0.15)' };
};
