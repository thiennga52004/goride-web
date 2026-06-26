import { TripStatus, UserStatus, ApprovalStatus } from '../constants/enums';

const STATUS_CONFIG = {
  // Trip statuses
  [TripStatus.SEARCHING]: { color: 'var(--accent-primary)', label: 'Đang tìm', bgColor: 'rgba(13, 110, 253, 0.1)' },
  [TripStatus.ACCEPTED]: { color: 'var(--accent-purple)', label: 'Đã nhận', bgColor: 'rgba(102, 16, 242, 0.1)' },
  [TripStatus.ARRIVED]: { color: 'var(--accent-yellow)', label: 'Đã đến', bgColor: 'rgba(255, 193, 7, 0.15)' },
  [TripStatus.IN_PROGRESS]: { color: 'var(--accent-primary)', label: 'Đang đi', bgColor: 'rgba(13, 110, 253, 0.1)' },
  [TripStatus.COMPLETED]: { color: 'var(--accent-green)', label: 'Hoàn thành', bgColor: 'rgba(25, 135, 84, 0.1)' },
  [TripStatus.CANCELLED]: { color: 'var(--accent-red)', label: 'Đã hủy', bgColor: 'rgba(220, 53, 69, 0.1)' },
  [TripStatus.NO_DRIVER]: { color: 'var(--text-tertiary)', label: 'Không có tài xế', bgColor: 'rgba(173, 181, 189, 0.15)' },

  // User statuses
  [UserStatus.ACTIVE]: { color: 'var(--accent-green)', label: 'Hoạt động', bgColor: 'rgba(25, 135, 84, 0.1)' },
  [UserStatus.SUSPENDED]: { color: 'var(--accent-red)', label: 'Đã khóa', bgColor: 'rgba(220, 53, 69, 0.1)' },

  // Approval statuses
  [ApprovalStatus.PENDING]: { color: 'var(--accent-yellow)', label: 'Chờ duyệt', bgColor: 'rgba(255, 193, 7, 0.15)' },
  [ApprovalStatus.APPROVED]: { color: 'var(--accent-green)', label: 'Đã duyệt', bgColor: 'rgba(25, 135, 84, 0.1)' },
  [ApprovalStatus.REJECTED]: { color: 'var(--accent-red)', label: 'Từ chối', bgColor: 'rgba(220, 53, 69, 0.1)' },
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
  return STATUS_CONFIG[status]?.bgColor || 'rgba(173, 181, 189, 0.15)';
};

/**
 * Get the full status config
 */
export const getStatusConfig = (status) => {
  return STATUS_CONFIG[status] || { color: 'var(--text-secondary)', label: status, bgColor: 'rgba(173, 181, 189, 0.15)' };
};
