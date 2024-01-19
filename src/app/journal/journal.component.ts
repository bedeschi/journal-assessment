import { Component, OnInit } from '@angular/core';
import { JournalService } from '../service/journal.service';
import { Journal } from './journal.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
})
export class JournalComponent implements OnInit {
  // DataSource for the Material table, initialized with the Journal model
  dataSource = new MatTableDataSource<Journal>();

  // Array of possible page sizes for pagination
  pageSizeOptions: number[] = [5, 10, 25];

  // Current page number, default is 1
  currentPage = 1;

  // Number of items per page, default is 10
  pageSize = 10;

  // Total number of entries in the dataset
  totalEntries = 0;

  // Array defining the columns to display in the Material table
  displayedColumns: string[] = ['symbol', 'title', 'date'];

  // Loading state indicator
  loading: boolean = false;

  // Error message holder
  error: string | null = null;

  constructor(
    private journalService: JournalService, // Service to fetch journal data
    public dialog: MatDialog, // Material Dialog for popups or modals
    private paginator: MatPaginator // Paginator for handling page changes
  ) {}

  ngOnInit(): void {
    // Fetch the initial journal data on component initialization
    this.fetchJournalData();

    // Subscribe to the paginator's page change events
    this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.currentPage = pageEvent.pageIndex + 1; // Update current page
      this.pageSize = pageEvent.pageSize; // Update page size
      this.fetchJournalData(); // Fetch new page data
    });
  }

  // Method to fetch journal data
  fetchJournalData(): void {
    this.loading = true; // Set loading state
    this.error = null; // Reset error state

    // Call the service to get journal data
    this.journalService.getJournalData().subscribe(
      (data) => {
        this.dataSource.data = data; // Update table data
        this.totalEntries = data.total; // Update total entries count
        this.loading = false; // Reset loading state
      },
      (error) => {
        this.error = 'Failed to fetch journal data.'; // Set error message
        this.loading = false; // Reset loading state
        console.error('Error fetching journal data:', error); // Log error
      }
    );
  }

  // Method to handle page changes
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1; // Update current page
    this.pageSize = event.pageSize; // Update page size
    this.fetchJournalData(); // Fetch new page data
  }
}
